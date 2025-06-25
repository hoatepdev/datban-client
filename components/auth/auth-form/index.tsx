"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputFloat from "@/components/common/input-float";
import Main, { FacebookIcon } from "./styled";
import { FcGoogle } from "react-icons/fc";
import { useLoginCredentials, useLoginGoogle } from "@/services/login";
import { useQueryClient } from "@tanstack/react-query";
import { ILoginRequest } from "@/types/login";
import { setClientCookie } from "@/utils/client-cookies";
import { useUserStore } from "@/stores/useStore";
import { Separator } from "@/components/ui/separator";
import { MdOutlineTouchApp } from "react-icons/md";
import { RiLoginCircleFill, RiMailFill } from "react-icons/ri";

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginRequest>();

  const queryClient = useQueryClient();
  const { setValue: setUser } = useUserStore();

  const loginCredentials = useLoginCredentials({
    mutationOptions: {
      onSuccess: (response) => {
        if (response) {
          setUser(response.user);
          setClientCookie("accessToken", response.accessToken);
          setClientCookie("refreshToken", response.refreshToken);
        }
        queryClient.invalidateQueries({ queryKey: ["loginCredentials"] });
      },
    },
  });

  const loginGoogle = useLoginGoogle({});

  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
    loginCredentials.mutate(data);
  };

  const handleLoginSocial = (platform: string) => () => {
    console.log("⭐ platform", platform);
    if (platform === "google") {
      loginGoogle.refetch();
    }
  };

  return (
    <Main>
      <div className={`wrapper ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
              <div>
                <div className="text-base text-gray-500">
                  Chào mừng bạn trở lại!
                </div>
                <div className="my-4 text-center text-4xl font-bold text-gray-900">
                  dat<span className="text-red-500">ban</span>.vn
                </div>
                <div className="text-sm text-gray-500">
                  Đăng nhập để quản lý đặt bàn, nhận ưu đãi đặc biệt và trải
                  nghiệm dịch vụ tốt nhất từ datban.vn.
                </div>
              </div>
              <div className="my-8 flex w-full flex-col gap-4">
                <Button
                  variant="outline"
                  onClick={handleLoginSocial("google")}
                  className="flex gap-2 p-6"
                >
                  <FcGoogle className="text-2xl" />
                  <span className="flex-1">Đăng nhập với Google</span>
                </Button>
                <Button variant="outline" className="flex gap-2 p-6">
                  <FacebookIcon className="text-2xl" />
                  <span className="flex-1">Đăng nhập với Facebook</span>
                </Button>
              </div>
              <Separator>Hoặc</Separator>
              <div className="mt-8 w-full text-center">
                <InputFloat
                  type="text"
                  placeholder=" "
                  className={errors.email ? "input-error" : ""}
                  label="Email"
                  message={errors.email?.message}
                  register={register("email", {
                    required: "Địa chỉ email là bắt buộc!",
                  })}
                />
                <InputFloat.Password
                  placeholder=" "
                  register={register("password", {
                    required: "Mật khẩu là bắt buộc!",
                  })}
                  className={errors.password ? "input-error" : ""}
                  label="Mật khẩu"
                  message={errors.password?.message}
                />
                <div className="text-right text-sm text-blue-500 hover:text-blue-600">
                  Quên mật khẩu?
                </div>
                <Button type="submit" className="mt-2">
                  Đăng nhập
                </Button>
              </div>
              <div className="mt-10 text-center text-sm text-gray-500">
                Bạn sở hữu nhà hàng?
                <a
                  href="/partner/register"
                  className="ml-1 text-red-500 hover:underline"
                >
                  Trở thành đối tác tại đây
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <div className="flex-1">
                <div>
                  <div className="text-base text-gray-500">
                    Chào mừng bạn đến với
                  </div>
                  <div className="my-4 text-center text-4xl font-bold text-gray-900">
                    dat<span className="text-red-500">ban</span>.vn
                  </div>
                  <div className="text-base text-gray-500">
                    Đăng ký để nhận được nhiều ưu đãi và trải nghiệm tốt nhất từ
                    datban.vn.
                  </div>
                </div>
                <div className="my-8 flex w-full flex-col gap-4">
                  <Button
                    variant="outline"
                    onClick={handleLoginSocial("google")}
                    className="flex gap-2 p-6"
                  >
                    <FcGoogle className="text-2xl" />
                    <span className="flex-1">Đăng nhập với Google</span>
                  </Button>
                  <Button variant="outline" className="flex gap-2 p-6">
                    <FacebookIcon className="text-2xl" />
                    <span className="flex-1">Đăng nhập với Facebook</span>
                  </Button>
                  <Button variant="outline" className="flex gap-2 p-6">
                    <RiMailFill className="text-2xl" />
                    <span className="flex-1">Đăng nhập với email</span>
                  </Button>
                </div>
                {/* <div className="mt-8 w-full text-center">
                <InputFloat
                  type="text"
                  placeholder=" "
                  className={errors.email ? "input-error" : ""}
                  label="Email"
                  message={errors.email?.message}
                  register={register("email", {
                    required: "Địa chỉ email là bắt buộc!",
                  })}
                />
                <InputFloat.Password
                  placeholder=" "
                  register={register("password", {
                    required: "Mật khẩu là bắt buộc!",
                  })}
                  className={errors.password ? "input-error" : ""}
                  label="Mật khẩu"
                  message={errors.password?.message}
                />
                <div className="text-right text-sm text-blue-500 hover:text-blue-600">
                  Quên mật khẩu?
                </div>
                <Button type="submit" className="mt-2">
                  Đăng nhập
                </Button>
              </div> */}
              </div>
              <div className="mt-10 text-center text-sm text-gray-500">
                Bạn sở hữu nhà hàng?
                <a
                  href="/partner/register"
                  className="ml-1 text-red-500 hover:underline"
                >
                  Trở thành đối tác tại đây
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <div>
                <h3 className="flex items-center gap-2">
                  <MdOutlineTouchApp className="text-2xl" />
                  Bạn chưa có tài khoản?
                </h3>
                <div className="mb-12 mt-4">
                  <span>
                    Đăng ký ngay để không bỏ lỡ những deal hot mỗi ngày!
                  </span>
                </div>
                <div className="btn-sign-up">
                  <Button
                    variant="outline"
                    id="sign-up-btn"
                    className="btn"
                    onClick={() => setIsSignUpMode(true)}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <div>
                <h3 className="flex items-center gap-2">
                  <RiLoginCircleFill className="text-2xl" />
                  Bạn đã có tài khoản?
                </h3>
                <div className="mb-12 mt-4">
                  <span>
                    Vào ngay để đặt bàn, giữ chỗ và khám phá ưu đãi hot hôm nay!
                  </span>
                </div>
              </div>
              <div className="btn-sign-in">
                <Button
                  variant="outline"
                  id="sign-in-btn"
                  className="btn"
                  onClick={() => setIsSignUpMode(false)}
                >
                  Đăng nhập
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AuthForm;
