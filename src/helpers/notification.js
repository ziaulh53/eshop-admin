import { notification } from "ant-design-vue";

notification.config({
  placement: "bottomRight",
  bottom: "50px",
  duration: 2,
});
export const notify = (data, refetch) => {
  if (data.success) {
    notification.success({
      message: data?.msg,
    });
    if(typeof refetch ==='function'){
      refetch();
    }
  } else if (!data.success) {
    notification.warn({
      message: data?.msg,
    });
  } else {
    notification.error({
      message: "Somethinbg went wrong",
    });
  }
};
