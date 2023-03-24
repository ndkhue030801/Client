import React from 'react';
import { Button, Rate, Input } from 'antd';

const color = {color: 'red'}
const MainScreen = () => {
    const TextArea = Input;
    return (
        <div style={{
            textAlign: "center"
        }}>
            <div style={{
                width: "960px",
                height: "450px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                <div><h3>Văn bản gốc</h3></div>
                <textarea style={{
                    width: "360px",
                    height: "360px",
                    border: "1px solid black"
                }}>
                </textarea>
                </div>
                <div>
                <div><h3>Văn bản tóm tắt</h3></div>
                <div style={{
                    width: "360px",
                    height: "360px",
                    border: "1px solid black"
                }}>
                </div>
                </div>
            </div>
            <div style={{
                width: "960px",
                height: "50px",
                display: "flex",
                flexDirection: "column"
            }}>
            <div>
            <input type = "radio" name = "Option" value = "Opt1"></input>
            <label>Abstractive: Viết lại tóm tắt dựa trên việc hiểu nội dung của tài liệu.</label>
            </div>
            <div>
            <input type = "radio" name = "Option" value = "Opt2"></input>
            <label>Extractive: Chọn các ý chính trong tài liệu.</label>
            </div>
            </div>
            
            <Button type="primary">Tóm tắt</Button>
            <p style = {color}>
                Để sử dụng lượt tiếp theo, vui lòng đánh giá chất lượng văn bản tóm tắt
            </p>
            <Rate />
            <p>
                Ý kiến đóng góp (Không bắt buộc) 
            </p>
            <TextArea rows={4} placeholder="Xin mời đóng góp ý kiến!"/>
        </div>
    )
}

export default MainScreen;