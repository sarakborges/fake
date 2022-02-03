export const displayToast = (toast, type, dispatch) => {
  const toastTypes = [
    {
      title: "Sucesso!",
      type: "success",
    },

    {
      title: "Erro!",
      type: "error",
    },

    {
      title: "Cuidado!",
      type: "warning",
    },
  ];

  dispatch({
    type: "SET_TOAST",
    data: {
      ...toastTypes[type],
      text: toast[type],
      isVisible: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: "TOGGLE_TOAST",
      data: false,
    });
  }, 5000);
};
