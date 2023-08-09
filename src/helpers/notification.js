import { notification } from "ant-design-vue";

notification.config({
  placement: "bottomRight",
  bottom: "50px",
  duration: 2,
});
export const notify = (data) => {
  if (data.success) {
    notification.success({
      message: data?.msg,
    });
  } else if (!data.success) {
    notification.warning({
      message: data?.msg,
    });
  } else {
    notification.error({
      message: "Somethinbg went wrong",
    });
  }
};
