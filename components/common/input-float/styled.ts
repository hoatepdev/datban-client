import styled from "styled-components";

const Main = styled.div`
  position: relative;
  width: 100%;
  margin: 12px 0 8px 0;

  label {
    position: absolute;
    padding: 0 6px;
    top: -10px;
    left: 10px;
    font-size: 12px;
    background: #fff;
  }

  input {
    width: 100%;
    min-width: 220px;
    height: 44px;
    font-size: 14px;
    color: #222;
    padding: 0 40px 0 14px;
    background: white;
    border: 1.5px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  input:focus {
    border-color: #2563eb;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
  }

  .message-error {
    color: #ef4444;
    font-size: 13px;
    margin-top: 4px;
    margin-left: 4px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  .input-icon-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 3;
    display: flex;
    align-items: center;
    color: #888;
    transition: color 0.2s;
  }
  .input-icon-btn:focus {
    color: #2563eb;
  }
`;
export default Main;
