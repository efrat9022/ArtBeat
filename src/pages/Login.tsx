// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/slices/userSlice';
// import { setMessage } from '../redux/slices/messageSlice';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('אימייל לא תקין').required('יש להזין אימייל'),
//       password: Yup.string().required('יש להזין סיסמה'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const res = await axios.get(`http://localhost:4000/users?email=${values.email}`);
//         const user = res.data[0];

//         if (!user) {
//           dispatch(setMessage({ type: 'error', text: 'אימייל לא נמצא' }));
//           return;
//         }

//         if (user.password !== values.password) {
//           dispatch(setMessage({ type: 'error', text: 'סיסמה שגויה' }));
//           return;
//         }

//         dispatch(login(user));
//         dispatch(setMessage({ type: 'success', text: 'התחברות הצליחה!' }));
//         navigate(user.isAdmin ? '/admin/add' : '/');
//       } catch {
//         dispatch(setMessage({ type: 'error', text: 'שגיאה בהתחברות' }));
//       }
//     },
//   });

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
//       <Typography variant="h5" gutterBottom>התחברות</Typography>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="אימייל"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="סיסמה"
//           type="password"
//           name="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           התחבר
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default Login;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { setMessage } from '../redux/slices/messageSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('אימייל לא תקין').required('יש להזין אימייל'),
      password: Yup.string().required('יש להזין סיסמה'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`http://localhost:4000/users?email=${values.email}`);
        const user = res.data[0];

        if (!user) {
          dispatch(setMessage({ type: 'error', text: 'אימייל לא נמצא' }));
          return;
        }

        if (user.password !== values.password) {
          dispatch(setMessage({ type: 'error', text: 'סיסמה שגויה' }));
          return;
        }

        dispatch(login(user));
        dispatch(setMessage({ type: 'success', text: 'התחברות הצליחה!' }));
        navigate(user.isAdmin ? '/admin/add' : '/');
      } catch {
        dispatch(setMessage({ type: 'error', text: 'שגיאה בהתחברות' }));
      }
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581093588401-ec1a0b2d066f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '1rem',
      }}
      dir="rtl"
    >
      <div
        className="bg-white p-4 shadow rounded-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.93)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="text-center mb-4">
          <h4 className="fw-bold"> התחברות ל־ArtBeat</h4>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">אימייל</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">סיסמה</label>
            <input
              type="password"
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-bold">
            התחברות
          </button>
        </form>

        <hr className="my-4" />
        <p className="text-center text-muted mb-2">או התחבר באמצעות</p>
        <div className="d-flex justify-content-center gap-3">
          <i className="bi bi-apple fs-4"></i>
          <i className="bi bi-facebook fs-4"></i>
          <i className="bi bi-google fs-4"></i>
        </div>
      </div>
    </div>
  );
};

export default Login;

