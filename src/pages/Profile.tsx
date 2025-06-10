import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateProfile } from '../redux/slices/userSlice';
import { setMessage } from '../redux/slices/messageSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('שדה חובה'),
      email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
      password: Yup.string().min(6, 'לפחות 6 תווים')
    }),
    onSubmit: async (values) => {
      if (!user) return;
      try {
        const updatedUser = {
          ...user,
          ...values,
          password: values.password || user.password
        };

        await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser);
        dispatch(updateProfile(updatedUser));
        dispatch(setMessage({ type: 'success', text: 'הפרטים עודכנו בהצלחה' }));
        navigate(user.isAdmin ? '/admin/add' : '/');
      } catch {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בעדכון הפרטים' }));
      }
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="bg-white shadow p-4 rounded-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h4 className="text-center fw-bold mb-4">עריכת פרופיל </h4>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="name">שם</Label>
            <Input
              type="text"
              name="name"
              id="name"
              className="bg-light border-0"
              value={formik.values.name}
              onChange={formik.handleChange}
              invalid={formik.touched.name && !!formik.errors.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger small">{formik.errors.name}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="email">אימייל</Label>
            <Input
              type="email"
              name="email"
              id="email"
              className="bg-light border-0"
              value={formik.values.email}
              onChange={formik.handleChange}
              invalid={formik.touched.email && !!formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger small">{formik.errors.email}</div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="password">סיסמה חדשה</Label>
            <Input
              type="password"
              name="password"
              id="password"
              className="bg-light border-0"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <small className="text-muted">השאר ריק אם לא מעוניינים לשנות סיסמה</small>
          </FormGroup>

          <Button
            color="dark"
            block
            className="w-100 fw-bold mt-3"
            type="submit"
          >
            שמור שינויים
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;



