import Button from "@material-ui/core/Button";

const Oauth = () => {
  return (
    <>
      <hr />
      <div className="col-12 d-flex justify-content-center">OR log in with</div>
      <div className="col-12 d-flex justify-content-center">
        <Button
          href={process.env.REACT_APP_OAUTH_GOOGLE_URL}
          variant="contained"
          color="secondary"
        >
          <i className="fa fa-2x fa-google" aria-hidden="true"></i>
        </Button>
      </div>
    </>
  );
};

export default Oauth;
