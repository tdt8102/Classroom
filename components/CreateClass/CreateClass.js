import React, { useState } from 'react'
import { useLocalContext } from '../../context/context'
import { Button, Checkbox, Dialog, DialogActions, DialogContent } from '@mui/material';
import './style.css'
import Form from './Form';



const CreateClass = () => {
    const { createClassDialog, SetCreateClassDialog } = useLocalContext();
    const [check, setChecked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <Dialog
                onClose={() => SetCreateClassDialog(false)}
                aria-labelledby="customized-dialog-title"
                open={createClassDialog}
                maxWidth={showForm ? "lq" : "xs"}
                className='form_dialog'
            >
                {showForm ? (
                    <Form />
                ) : (
                    <>
                        <div className="class__title">
                            Sử dụng Lớp học tại trường học với sinh viên?
                        </div>
                        <DialogContent className='class__content'>
                            <p className="class__text">
                                <p>Nếu vậy, trường của bạn phải đăng ký tài khoản</p>
                                <a href="/help" className="class__link">
                                    G Suite for Education
                                </a>
                                trước khi bạn có thể sử dụng Lớp học.
                                <a href="/learn" className="class__link2">
                                    Tìm hiểu thêm.
                                </a>
                            </p>
                            <p>
                                G Suite for Education cho phép trường học quyết định học viên có thể sử dụng những dịch vụ nào của Google cũng như cung cấp các hàng rào
                                <a href="/privacy" className="class__link2 class__link">
                                    bảo mật và quyền riêng tư
                                </a>
                                quan trọng trong môi trường trường học. Học sinh có thể sử dụng Hunre Classroom tại trường bằng tài khoản cá nhân.
                            </p>

                            <div className='class__checkboxWrapper'>
                                <Checkbox color='primary' onChange={() => setChecked(!check)} />
                                <p>
                                    Tôi đã đọc cũng như hiểu thông báo ở trên và tôi hiện không
                                    sử dụng Lớp học tại trường học với sinh viên
                                </p>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => SetCreateClassDialog(false)}>
                                Đóng
                            </Button>

                            <Button autoFocus color='primary' disabled={(!check)}
                                onClick={() => setShowForm(true)}
                            >
                                Tiếp tục
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default CreateClass


