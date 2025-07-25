export default function Button({ children, type, styleType, ...rest }) {
  const baseStyle = "font-extrabold hover:cursor-pointer rounded-[10px] flex";

  const style = {
    submit:
      "bg-purpleDark text-white hover:bg-gradient-to-b from-purpleMedium to-[#52377B]",
    button: {
      parent: "bg-gradient-to-b from-purpleMedium to-[#52377B] p-[2px]",
      child:
        "bg-white text-purpleMedium w-full rounded-sm hover:bg-transparent hover:text-white",
    },
  };

  if (styleType === "button") {
    return (
      <button
        className={`${baseStyle} w-full justify-center  ${style.button.parent}`}
        {...rest}
      >
        <span className={style.button.child}>{children}</span>
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${baseStyle} w-full justify-center px-4 py-[10px] ${style[styleType]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
