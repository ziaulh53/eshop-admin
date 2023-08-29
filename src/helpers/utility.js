import { ORDER_STATUS } from "../constant";
export const getStatusColor = (status) => {
  switch (status) {
    case ORDER_STATUS.Pending:
      return "gold";
    case ORDER_STATUS.Accepted:
      return "green";
    case ORDER_STATUS.Shipped:
      return "blue";
    case ORDER_STATUS.Delivered:
      return "success";
    case ORDER_STATUS.Cancelled:
      return "red";
    default:
      return "green";
  }
};
