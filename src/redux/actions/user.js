import { firebase } from '../../firebase';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  LOGOUT,
} from '../types';
import md5 from 'md5';

export const login = (userData, shouldLoad) => (dispatch) => {
  const { email, password } = userData;
  const errors = [];

  // Validation
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email) {
    errors.email = 'Must not be empty';
  } else if (!re.test(String(email).toLowerCase())) {
    errors.email = 'Email is not valid';
  }

  if (!password) errors.password = 'Must not be empty';
  else if (password.length < 6)
    errors.password = 'Must be 6 characters or longer';

  if (Object.keys(errors).length > 0) {
    dispatch(setErrors(errors));
    return shouldLoad(false);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then((user) => {
      dispatch(clearErrors());
      shouldLoad(false);
    })
    .catch((e) => {
      console.log(e.code);
      if (e.code === 'auth/user-not-found')
        dispatch(
          setErrors({
            general: "Credentials don't match a user account, please try again",
          })
        );
      else if (e.code === 'auth/wrong-password') {
        dispatch(
          setErrors({
            password: 'Incorrect, please try again',
          })
        );
      } else if (e.code === 'auth/too-many-requests') {
        dispatch(
          setErrors({
            general: 'Too many request, try again in a few seconds',
          })
        );
      }
      shouldLoad(false);
    });
};

export const signUp = (credentials, shouldLoad) => (dispatch) => {
  const { email, password, confirmPassword, displayName } = credentials;

  const errors = {};
  // Validation
  if (!displayName) errors.displayName = 'Must not be empty';
  else if (displayName.length < 3)
    errors.displayName = 'Must be at least 3 characters long';

  // email regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email) {
    errors.email = 'Must not be empty';
  } else if (!re.test(String(email).toLowerCase())) {
    errors.email = 'Email is not valid';
  }

  if (!password) errors.password = 'Must not be empty';
  else if (password.length < 6)
    errors.password = 'Must be 6 characters or longer';
  else if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords do not match, please try again';

  //Dispatch set errors action if there are any errors stored
  if (Object.keys(errors).length > 0) {
    dispatch(setErrors(errors));
    return shouldLoad(false);
  }

  const db = firebase.database();
  const users = db.ref('users');
  const query = users
    .orderByChild('displayName')
    .equalTo(credentials.displayName)
    .limitToFirst(1);

  query.once('value', (snapshot) => {
    if (!snapshot.exists()) {
      const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          users.child(credentials.displayName).set({
            displayName: credentials.displayName,
            email: credentials.email,
            gravatar,
            createdAt: new Date().toISOString(),
          });

          user.user.updateProfile({
            displayName: displayName,
            photoURL: gravatar,
          });

          dispatch(setUser(user.user));
          dispatch({ type: SET_AUTHENTICATED });
          dispatch(clearErrors());
        })
        .catch((e) => {
          if (e.code === 'auth/email-already-in-use')
            dispatch(
              setErrors({
                email: 'Email address already in use',
              })
            );
          shouldLoad(false);
        });
    } else {
      dispatch(
        setErrors({
          displayName: 'Display name already taken',
        })
      );
      shouldLoad(false);
    }
  });
};

export const logout = () => (dispatch) => {
  firebase.auth().signOut();
  dispatch({ type: LOGOUT });
};

export const setErrors = (errors) => (dispatch) => {
  dispatch({ type: SET_ERRORS, payload: errors });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER, payload: user });
};
