import React, { useEffect, useState } from "react";
import { Button, Rate, Input, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

const color = { color: "red" };
const MainScreen = ({ state, setState }) => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [model, setModel] = useState("");
  const [dataRes, setDataRes] = useState({
    id_save: "",
    text_summary: "",
  });
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  useEffect(() => {
    // console.log(state, "state");
    // console.log(model);
    // console.log(text);
    // console.log(rate);
    console.log(review);
  }, [review]);

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

  const textSummarization = () => {
    axios
      .post(`http://aicsdeep.ddns.net:8090/api/v1/text_summarization`, {
        user_name: state?.user_name,
        token_login: state?.token,
        type_summary: model,
        data_text: text,
      })
      .then(function (response) {
        console.log(response);
        let { data } = response;
        if (data.code == 200) {
          setDataRes({
            id_save: data.data.id_save,
            text_summary: data.data.text_summary,
          });
        } else {
          modal.error({
            title: "Error !",
            content: (
              <>
                <div>Text summary thất bại</div>
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

  const handleReview = () => {
    let rateStr = "";
    if (rate == 1) {
      rateStr = "1 - Rất tệ";
    } else if (rate == 2) {
      rateStr = "2 - Tệ";
    } else if (rate == 3) {
      rateStr = "3 - Bình thường";
    } else if (rate == 4) {
      rateStr = "4 - Tốt";
    } else if (rate == 5) {
      rateStr = "5 - Rất tốt";
    }
    axios
      .post(`http://aicsdeep.ddns.net:8090/api/v1/review`, {
        user_name: state?.user_name,
        token_login: state?.token,
        id_save: dataRes?.id_save,
        data_review: rateStr,
      })
      .then(function (response) {
        console.log(response, "res review");
        let { data } = response;
        if (data.code == 200) {
          setDataRes({
            id_save: "",
          });
        } else {
          modal.error({
            title: "Error !",
            content: (
              <>
                <div>Text summary thất bại</div>
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
            onChange={(e) => setText(e.target.value)}
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
              textAlign: "start",
              width: "360px",
              height: "360px",
              border: "1px solid black",
            }}
          >
            {dataRes.text_summary}
          </div>
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
        <div
          onChange={(e) => {
            e.target.checked && setModel("model_1");
          }}
        >
          <input type="radio" name="Option" value="Opt1"></input>
          <label>
            Abstractive: Viết lại tóm tắt dựa trên việc hiểu nội dung của tài
            liệu.
          </label>
        </div>
        <div
          onChange={(e) => {
            e.target.checked && setModel("model_2");
          }}
        >
          <input type="radio" name="Option" value="Opt2"></input>
          <label>Extractive: Chọn các ý chính trong tài liệu.</label>
        </div>
      </div>

      <Button type="primary" onClick={() => textSummarization()}>
        Tóm tắt
      </Button>
      <p style={color}>
        Để sử dụng lượt tiếp theo, vui lòng đánh giá chất lượng văn bản tóm tắt
      </p>
      <Rate onChange={setRate} value={rate} />
      <p>Ý kiến đóng góp (Không bắt buộc)</p>
      <TextArea
        rows={4}
        placeholder="Xin mời đóng góp ý kiến!"
        onChange={(e) => setReview(e.target.value)}
      />
      <Button type="primary" onClick={() => handleReview()}>
        Gửi đánh giá
      </Button>
    </div>
  );
};

export default MainScreen;
