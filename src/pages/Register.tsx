import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/messageSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('יש להזין שם'),
      email: Yup.string().email('אימייל לא תקין').required('יש להזין אימייל'),
      password: Yup.string()
        .min(6, 'הסיסמה חייבת לפחות 6 תווים')
        .matches(/[a-z]/, 'חייב אות קטנה')
        .matches(/[A-Z]/, 'חייב אות גדולה')
        .matches(/[0-9]/, 'חייב ספרה אחת לפחות')
        .required('יש להזין סיסמה'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`http://localhost:4000/users?email=${values.email}`);
        if (res.data.length > 0) {
          dispatch(setMessage({ type: 'error', text: 'משתמש קיים, נא להתחבר' }));
          navigate('/login');
          return;
        }

        await axios.post('http://localhost:4000/users', {
          ...values,
          isAdmin: false,
        });

        dispatch(setMessage({ type: 'success', text: 'ההרשמה הצליחה! התחבר עכשיו' }));
        navigate('/login');
      } catch {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בהרשמה' }));
      }
    },
  });

  return (
    <div className="container" dir="rtl" style={{ maxWidth: '400px', paddingTop: '100px' }}>
      <h2 className="text-center mb-4">הרשמה</h2>
      <form onSubmit={formik.handleSubmit} className="border rounded p-4 shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">שם</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">אימייל</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">סיסמה</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-2">הירשם</button>
      </form>
    </div>
  );
};

export default Register;
