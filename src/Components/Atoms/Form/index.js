// Dependencies
import { useContext, useEffect } from "react";

// Contexts
import { AppContext } from "Contexts/App";

const Form = ({ children, onSubmit }) => {
  const { appDispatch } = useContext(AppContext);

  useEffect(() => {
    appDispatch({
      type: "SET_IS_REQUESTING",
      data: false,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
