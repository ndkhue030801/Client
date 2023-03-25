import React, { useEffect } from "react";
import { Button, Rate, Input, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

const color = { color: "red" };
const MainScreen = ({ state, setState }) => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state, "state");
  }, []);

  const TextArea = Input;
  const logout = () => {
    axios
      .post(`http://aicsdeep.ddns.net:8090/api/v1/logout`, {
        user_name: state?.user_name,
        token_login: state?.token,
      })
      .then(function (response) {
        console.log(response);
        let { data } = response;
        if (data.code == 200) {
          setState({
            token: "",
            user_name: "",
          });
          navigate("/");
        } else {
          modal.error({
            title: "Error !",
            content: (
              <>
                <div>Log out thất bại</div>
                <div>Lí do : {data.message}</div>
              </>
            ),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      {contextHolder}
      <Button type="primary" onClick={() => logout()}>
        Thoát đăng nhâp
      </Button>
      <div
        style={{
          width: "960px",
          height: "450px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div>
            <h3>Văn bản gốc</h3>
          </div>
          <textarea
            style={{
              width: "360px",
              height: "360px",
              border: "1px solid black",
            }}
          ></textarea>
        </div>
        <div>
          <div>
            <h3>Văn bản tóm tắt</h3>
          </div>
          <div
            style={{
              width: "360px",
              height: "360px",
              border: "1px solid black",
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          width: "960px",
          height: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <input type="radio" name="Option" value="Opt1"></input>
          <label>
            Abstractive: Viết lại tóm tắt dựa trên việc hiểu nội dung của tài
            liệu.
          </label>
        </div>
        <div>
          <input type="radio" name="Option" value="Opt2"></input>
          <label>Extractive: Chọn các ý chính trong tài liệu.</label>
        </div>
      </div>

      <Button type="primary">Tóm tắt</Button>
      <p style={color}>
        Để sử dụng lượt tiếp theo, vui lòng đánh giá chất lượng văn bản tóm tắt
      </p>
      <Rate />
      <p>Ý kiến đóng góp (Không bắt buộc)</p>
      <TextArea rows={4} placeholder="Xin mời đóng góp ý kiến!" />
    </div>
  );
};

export default MainScreen;
