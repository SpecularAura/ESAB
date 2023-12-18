import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { useForm, useWatch } from "react-hook-form";

const loadOptions = async () => {
  const zxcvbnCommonPackage = await import(
    /* webpackChunkName: "zxcvbnCommonPackage" */ "@zxcvbn-ts/language-common"
  );
  const zxcvbnEnPackage = await import(
    /* webpackChunkName: "zxcvbnEnPackage" */ "@zxcvbn-ts/language-en"
  );

  return {
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    translations: zxcvbnEnPackage.translations,
  };
};

const runOptions = loadOptions();
export const useValidation = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { name, ref, onBlur } = register("password", {
    required: {
      value: true,
      message: "Password is required",
    },
    validate: async (value) => {
      const options = await runOptions;
      zxcvbnOptions.setOptions(options);
      const results = zxcvbn(value);
      console.log(results);
      return (
        results.score >= 3 ||
        results.feedback.warning ||
        results.feedback.suggestions[0]
      );
    },
  });
  const password = useWatch({
    control,
    name: "password",
  });
  const registerName = register("name", {
    required: "Your name is required",
    pattern: {
      value: /^\D+$/,
      message: "Name cannot contain numbers",
    },
  });
  const registerUsername = register("username", {
    required: {
      value: true,
      message: "Username is required",
    },
    minLength: {
      value: 3,
      message: "The username must be more than 3 letters",
    },
  });
  const registerEmail = register("email", {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid Email Address",
    },
  });
  const registerConfirmPassword = register("confirmPassword", {
    validate: (value) => (value !== password ? "Passwords do not match" : true),
  });

  return {
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    registerName,
    registerUsername,
    registerEmail,
    registerConfirmPassword,
    registerPassword: {
      name,
      ref,
      onBlur,
    },
  };
};
