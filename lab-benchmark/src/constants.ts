import categoriesOracle from './oracles/categories.json';
import ordersOracle from './oracles/orders.json';
import productsOracle from './oracles/products.json';
import usersOracle from './oracles/users.json';
import _ from 'lodash';

const constants = {
    TEST_USER_ID: usersOracle[0].id,
    TEST_PRODUCT_ID: productsOracle[0].id,
    TEST_ORDER_ID: ordersOracle[0].id,
    TEST_ORDER: {
        userId: usersOracle[1].id,
        products: [{ productId: productsOracle[0].id, quantity: 1 }],
        totalAmount: 8
    },
    TEST_UPDATE: {
        id: usersOracle[1].id,
        password: "test123"
    },

    EXPECTED_CATEGORIES: _.cloneDeep(categoriesOracle),
    EXPECTED_USER: _.cloneDeep(usersOracle[0]),
    EXPECTED_USERS: _.cloneDeep(usersOracle),
    EXPECTED_PRODUCT: _.cloneDeep(productsOracle[0]),
    EXPECTED_PRODUCTS: _.cloneDeep(productsOracle),
    EXPECTED_ORDER: _.cloneDeep(ordersOracle[0]),
    EXPECTED_ORDERS: _.cloneDeep(ordersOracle),
    EXPECTED_ORDERSBYUSER: _.cloneDeep(ordersOracle.filter((order) => order.userId === usersOracle[0].id))
};

export default constants;