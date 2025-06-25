import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";

export const FacebookIcon = styled(FaFacebook)`
  color: #4267b2;
`;

const Main = styled.div`
  .wrapper {
    position: relative;
    width: 100%;
    background: #fff;
    height: 70vh;
    overflow: hidden;
    &:before {
      content: "";
      position: absolute;
      width: 2000px;
      height: 2000px;
      top: -10%;
      right: 48%;
      transform: translateY(-50%);
      background: linear-gradient(-45deg, #dc2626 0%, #f59e0b 100%);
      transition: 1.5s ease-in-out;
      border-radius: 50%;
      z-index: 6;
    }
  }

  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .signin-signup {
      position: absolute;
      top: 50%;
      left: 75%;
      width: 50%;
      transform: translate(-50%, -50%);
      display: grid;
      grid-template-columns: 1fr;
      z-index: 5;
      transition: 1s 0.7s ease-in-out;
      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 3rem;
        transition: all 0.2s 0.7s;
        overflow: hidden;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
      form.sign-up-form {
        opacity: 0;
        z-index: 1;
      }
      form.sign-in-form {
        z-index: 2;
      }
      .title {
        font-size: 1.5rem;
        color: #444;
        margin-bottom: 10px;
        text-align: center;
      }
      .social-text {
        padding: 0.7rem 0;
        font-size: 1rem;
      }
      .social-media {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        width: 100%;
        > button {
          flex: 1;
        }
      }
    }
  }

  .panels-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .image {
      width: 100%;
      transition: transform 1.1s ease-in-out;
      transition-delay: 0.4s;
    }
    .panel {
      display: flex;
      flex-direction: column;
      /* align-items: flex-end; */
      /* justify-content: space-around; */
      z-index: 6;
      .content {
        color: #fff;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
      }
      h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 1.5rem;
      }
      p {
        font-size: 0.95rem;
        padding: 0.7rem 0;
      }
    }
    .left-panel {
      pointer-events: all;
      margin: 9rem 0 0 3rem;
    }
    .right-panel {
      pointer-events: none;
      margin: 9rem 3rem 0;

      .image {
        transform: translateX(800px);
      }
      .content {
        transform: translateX(800px);
      }
    }
  }

  .btn-sign-up,
  .btn-sign-in {
    display: flex;
    .btn {
      background: none;
      border: 1px solid #fff;
      outline: none;
      color: #fff;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
  .btn-sign-in {
    justify-content: flex-end;
  }

  .wrapper.sign-up-mode {
    &:before {
      transform: translate(100%, -50%);
      right: 52%;
    }
    .left-panel {
      .image {
        transform: translateX(-800px);
      }
      .content {
        transform: translateX(-800px);
      }
      pointer-events: none;
    }
    .signin-signup {
      left: 25%;
    }
    form.sign-up-form {
      opacity: 1;
      z-index: 2;
    }
    form.sign-in-form {
      opacity: 0;
      z-index: 1;
    }
    .right-panel {
      .image {
        transform: translateX(0%);
      }
      .content {
        transform: translateX(0%);
      }
      pointer-events: all;
    }
  }

  @media (max-width: 870px) {
    .wrapper {
      min-height: 800px;
      height: 100vh;
      &:before {
        width: 1500px;
        height: 1500px;
        left: 30%;
        bottom: 68%;
        right: initial;
        top: initial;
        transform: translateX(-50%);
        transition: 2s ease-in-out;
      }
      .signin-signup {
        width: 100%;
        top: 95%;
        left: 50%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
      }
    }
    .wrapper.sign-up-mode {
      .signin-signup {
        left: 50%;
        top: 5%;
        transform: translate(-50%, 0);
      }
      &:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
      }
      .left-panel {
        .image {
          transform: translateY(-300px);
        }
        .content {
          transform: translateY(-300px);
        }
      }
      .right-panel {
        .image {
          transform: translateY(0px);
        }
        .content {
          transform: translateY(0px);
        }
      }
    }
    .panels-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
      .panel {
        flex-direction: row;
        /* justify-content: space-around; */
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
        .content {
          padding-right: 15%;
          transition: transform 0.9s ease-in-out;
          transition-delay: 0.8s;
        }
        h3 {
          font-size: 1.2rem;
        }
        p {
          font-size: 0.7rem;
          padding: 0.5rem 0;
        }
      }
      .right-panel {
        grid-row: 3 / 4;
        .image {
          transform: translateY(300px);
        }
        .content {
          transform: translateY(300px);
        }
      }
      .left-panel {
        grid-row: 1 / 2;
      }
      .image {
        width: 200px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
      }
    }
    .btn.transparent {
      width: 110px;
      height: 35px;
      font-size: 0.7rem;
    }
  }

  @media (max-width: 570px) {
    form {
      padding: 0 1.5rem;
    }
    .image {
      display: none;
    }
    .panel {
      .content {
        padding: 0.5rem 1rem;
      }
    }
    .wrapper {
      padding: 1.5rem;
      &:before {
        bottom: 72%;
        left: 50%;
      }
    }
    .wrapper.sign-up-mode {
      &:before {
        bottom: 28%;
        left: 50%;
      }
    }
  }
`;

export default Main;
