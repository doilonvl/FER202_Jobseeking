import { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        const roleData = await axios.get("http://localhost:9999/Roles");
        setRoles(roleData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterRole = (id) => {
    const role = roles.find((role) => role.id === id);
    return role ? role.roleName : "123";
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
     
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-75">
          <div className="col-lg-6 mb-4 mb-lg-0" style={{width:'400px' }}>
            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '155px' }} />
                  <h5>Marie Horwitz</h5>
                  <p>Web Designer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Full Name </h6>
                        <p className="text-muted"> {user.username}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>

                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">info@example.com</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Role</h6>
                        <p className="text-muted">{filterRole(user.roleId)}</p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><i className="fab fa-facebook me-3"></i></a>
                      <a href="#!"><i className="fab fa-twitter me-3"></i></a>
                      <a href="#!"><i className="fab fa-instagram me-3"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

export default UserProfile;
