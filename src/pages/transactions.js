import * as React from 'react';

;
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/use-auth';
import { Layout as AuthLayout } from '../layouts/auth/layout';
import UpdateButtonColor from '../components/dashboard/game/update-button-color';
import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Transaction_Details(props) {
  const { open, handleModalPopup, setData, data } = props;
  const { game } = props;
  const { user } = useAuth();
  const [bankDetails, setBankDetails] = useState('');

  const formik = useFormik({
    initialValues: {
      transactionId: '',
      submit: null
    },
    validationSchema: Yup.object({
      transactionId: Yup
        .string()
        .max(255)
        .required('Transaction id is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = window.localStorage.getItem('token');
        const userId = user._id;
        const response = await axios.post(API_BASE_URL
          + '/api/admin/create-transaction',
          {
            userId,
            slug: game,
            transactionId: values.transactionId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            }
          }
        );

        setData({ ...data, transactionFound: true, transactionStatus: false, isPaid: false });

        toast.success(
          ' Transaction will be examined by the administrator, and that once approved, you will be notified by email',
          {
            duration: 5000
          });
        handleModalPopup(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    }
  });
  // fetch bank details:
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const token = window.localStorage.getItem('token');

        const response = await axios.get(API_BASE_URL + `/api/admin/get-details`, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        const data = response.data.data;
        setBankDetails(data);
      } catch (error) {
        console.log(error);
      }

    };
    fetchBankDetails();
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleModalPopup(false)}
        PaperProps={{
          component: 'form',
          onSubmit: formik.handleSubmit
        }}
      >
        <b><DialogTitle>Bank details</DialogTitle></b>
        <DialogContent>
          <DialogContentText>
            <b>Account Name:</b>{bankDetails ? bankDetails.name : ''}
          </DialogContentText>
          <DialogContentText>
            <b>Account No:</b> {bankDetails ? bankDetails.account_no : ''}
          </DialogContentText>
          <DialogContentText>
            <b>IBAN:</b> {bankDetails ? bankDetails.iban : ''}
          </DialogContentText>
          {
            bankDetails && bankDetails.description ? (
              <DialogContentText sx={{ overflow: 'hidden' }}>
                <b>Description:</b>
                <Box>
                  {bankDetails ? bankDetails.description : ''}
                </Box>
              </DialogContentText>
            ) : ''

          }

          <TextField
            // autoFocus
            margin="dense"
            name="transactionId"
            label="Transaction Id"
            type="text"
            fullWidth
            variant="standard"
            error={formik.touched.transactionId && Boolean(formik.errors.transactionId)}
            helperText={formik.touched.transactionId && formik.errors.transactionId}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.transactionId}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalPopup(false)}>Cancel</Button>
          <Button type="submit"
                  variant="contained"
                  onClick={() => handleModalPopup(false)}
                  disabled={formik.isSubmitting}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
Transaction_Details.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);