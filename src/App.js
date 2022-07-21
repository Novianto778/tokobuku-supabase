import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "services/supabaseClient";
import { authStateChange, getUserData } from "store/userSlice";
import Router from "./constants/routes";

function App() {
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state.user);
  useEffect(() => {
    const user = supabase.auth.user();
    const rec_session = supabase.auth.session();
    dispatch(authStateChange({ session: rec_session, user }));
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(authStateChange({ session, user }));
      // console.log(_event, session)
    });
    if (user) dispatch(getUserData(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <Router />;
}

export default App;
