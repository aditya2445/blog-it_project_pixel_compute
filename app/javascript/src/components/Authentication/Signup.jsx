import React, { useEffect, useState } from "react";

import authApi from "apis/auth";
import organizationsApi from "apis/organization";
import SignupForm from "components/Authentication/Form/Signup";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const fetchOrganisations = async () => {
    try {
      const { data } = await organizationsApi.fetch();
      setOrganizations(data.organizations);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: selectedOrganization.value,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={loading}
      organizations={organizations}
      selectedOrganization={selectedOrganization}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      setSelectedOrganization={setSelectedOrganization}
    />
  );
};

export default Signup;
