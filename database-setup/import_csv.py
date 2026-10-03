import csv
import os
import json

def parse_dynamodb_cell(cell):
    # Parse the string as JSON and extract the DynamoDB data type and value
    try:
        # It's safer to replace single quotes with double quotes for valid JSON
        cell = cell.replace("'", "\"")
        data = json.loads(cell)
    except json.JSONDecodeError:
        raise ValueError(f"Unable to parse cell content as JSON: {cell}")

    if not isinstance(data, dict) or len(data) != 1:
        raise ValueError(f"Cell does not seem to be in DynamoDB format: {cell}")

    dynamodb_type, value = next(iter(data.items()))

    return convert_dynamodb_value(dynamodb_type, value)

def convert_dynamodb_value(dynamodb_type, value):
    if dynamodb_type == 'S':
        return str(value)
    elif dynamodb_type == 'N':
        try:
            return int(value)
        except ValueError:
            return float(value)
    elif dynamodb_type == 'BOOL':
        return value == 'true'
    elif dynamodb_type == 'NULL':
        return None
    elif dynamodb_type == 'L':
        return [convert_dynamodb_value(v_type, v) for item in value for v_type, v in item.items()]
    elif dynamodb_type == 'M':
        return {k: convert_dynamodb_value(v_type, v) for k, nested in value.items() for v_type, v in nested.items()}
    else:
        raise ValueError(f"Unsupported or unknown DynamoDB data type: {dynamodb_type}")

def dynamodb_csv_to_map(csv_file_path):
    dynamodb_data = []

    with open(csv_file_path, newline='') as csvfile:
        csv_reader = csv.DictReader(csvfile)

        for row in csv_reader:
            parsed_row = {key: parse_dynamodb_cell(value) for key, value in row.items()}
            dynamodb_data.append(parsed_row)

    return dynamodb_data

def import_csv() -> dict[str, list[dict]]:
    files = os.listdir('csv')
    data = {}
    for file in files:
        table_name = file.split('.')[0]
        data[table_name] = dynamodb_csv_to_map(f'csv/{file}')
    return data
