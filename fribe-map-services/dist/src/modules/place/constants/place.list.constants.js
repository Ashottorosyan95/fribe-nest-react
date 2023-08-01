"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACE_DEFAULT_AVAILABLE_SEARCH = exports.PLACE_DEFAULT_AVAILABLE_ORDER_BY = exports.PLACE_DEFAULT_ORDER_DIRECTION = exports.PLACE_DEFAULT_ORDER_BY = exports.PLACE_DEFAULT_AVAILABLE_SORT = exports.PLACE_DEFAULT_PER_PAGE = exports.PLACE_DEFAULT_SORT = void 0;
const pagination_enum_constant_1 = require("../../../common/pagination/constants/pagination.enum.constant");
exports.PLACE_DEFAULT_SORT = 'name@asc';
exports.PLACE_DEFAULT_PER_PAGE = 20;
exports.PLACE_DEFAULT_AVAILABLE_SORT = ['name'];
exports.PLACE_DEFAULT_ORDER_BY = 'createdAt';
exports.PLACE_DEFAULT_ORDER_DIRECTION = pagination_enum_constant_1.ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
exports.PLACE_DEFAULT_AVAILABLE_ORDER_BY = ['name', 'formattedAddress', 'city', 'country'];
exports.PLACE_DEFAULT_AVAILABLE_SEARCH = ['name', 'formattedAddress', 'city', 'country'];
//# sourceMappingURL=place.list.constants.js.map