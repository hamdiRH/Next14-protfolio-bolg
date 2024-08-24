import { setOtpCode } from "@/redux/actions/authActions";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function OTPSecure() {
  const { otpCode } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const submitRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const inputs = inputsRef.current;

    const handleKeyDown = (e) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const index = inputs.indexOf(e.target);
        if (index > 0) {
          inputs[index - 1].value = "";
          inputs[index - 1].focus();
        }
      }
    };

    const handleInput = (e) => {
      const target = e.target;
      const index = inputs.indexOf(target);
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          const otpCode = inputs.map((input) => input.value).join("");
          if (otpCode.length === inputs.length) {
            handleSubmit();
          }
        }
      }
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.split("");
      inputs.forEach((input, index) => (input.value = digits[index]));
      if (text.length === inputs.length) {
        handleSubmit();
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("focus", handleFocus);
      input.addEventListener("paste", handlePaste);
    });

    return () => {
      inputs.forEach((input) => {
        if (input) {
          input.removeEventListener("input", handleInput);
          input.removeEventListener("keydown", handleKeyDown);
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("paste", handlePaste);
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent the form from reloading the page
    const otpCode = inputsRef.current.map((input) => input.value).join("");
    dispatch(setOtpCode(otpCode));
    // You can now use the otpCode for verification or further processing
  };

  return (
    <div className="h-screen border-4 border-red-200 flex items-center justify-center">
      <div className="max-w-md text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow ">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code number. {otpCode}
          </p>
        </header>
        <form ref={formRef} id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength="1"
                ref={(el) => (inputsRef.current[i] = el)}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              ref={submitRef}
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
