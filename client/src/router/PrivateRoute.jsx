const PrivateRoute = (props) => {
  //const { auth } = useSelector((state) => state);
  const { children } = props;
  //   if (!auth.token) {
  //     return <Navigate to={"/login"} />;
  //   }
  return children;
};

export default PrivateRoute;
