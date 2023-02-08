import { useNavigate } from "react-router-dom";

function MainMenu() {
    const navigate = useNavigate();

    return (
      <div className="main-menu">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <img src="/images/anim.gif" height={256} />                    
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-xs-6 tile">
                    <a onClick={()=>{
                        navigate("/scan-qrc");
                    }}>
                        <img src="/images/icons/qrc.svg" className="filter-white" height={64} width={64} />
                        <p>Scan QR Code</p>
                    </a>
                </div>
                <div className="col-sm-4 col-xs-6 tile">
                    <a onClick={()=>{
                        navigate("/set-phone-number");
                    }}>
                        <img src="/images/icons/mobile.svg" className="filter-white" height={64} width={64} />
                        <p>Set Phone number</p>
                    </a>
                </div>
                <div className="col-sm-4 col-xs-6 tile">
                    <img src="/images/icons/people.svg" className="filter-white" height={64} width={64} />
                    <p>Pay Contacts</p>
                </div>
                <div className="col-sm-4 col-xs-6 tile">
                    <a onClick={()=>{
                        navigate("/generate-qrc");
                    }}>
                        <img src="/images/icons/qrc.svg" className="filter-white" height={64} width={64} />
                        <p>Generate QRC</p>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-6 tile">
                    <a onClick={()=>{
                        navigate("/view-balance");
                    }}>
                        <img src="/images/icons/balance.svg" className="filter-white" height={64} width={64} />
                        <p>View Balance</p>
                    </a>
                </div>
                <div className="col-xs-6 tile">
                    <a onClick={()=>{
                        navigate("/view-transactions");
                    }}>
                        <img src="/images/icons/transactions.svg" className="filter-white" height={64} width={64} />
                        <p>View Transactions</p>
                    </a>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default MainMenu;
  