import React from 'react';
import './css/managerHomePage.css';
import ManagerDashboard from './managerDashboard';
import { useNavigate } from 'react-router-dom';

function ManagerHomePage() {
  const navigate = useNavigate();
  
 const handleMyDashboard=()=>
  {
    navigate('/ManagerDashboar')
  };
  const handleServices=()=>
    {
      navigate('/ManagerServices')
    };
    const handleDictionary=()=>
      {
        navigate('/ManagerDictionary')
      };
      const handleClients=()=>
        {
          navigate('/ManagerClients')
        };
  return (
    <div className="main">
      <header>
        <h1>ברוך הבא, מנהל</h1>
        <p>דף הבית שלך</p>
      </header>
      <div className="container">
        <section className="navigation">
          <div className="nav-item" onClick={()=>{handleMyDashboard()}}>
            <a  href=''>האזור האישי</a>
          </div>
          <div className="nav-item" onClick={()=>{handleClients()}}>
            <a href="">רשימת לקוחות</a>
          </div>
          <div className="nav-item" onClick={()=>{handleDictionary()}}>
            <a href="">יומן פגישות</a>
          </div>
          <div className="nav-item" onClick={()=>{handleServices()}}>
            <a href="">שירותים</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManagerHomePage;


