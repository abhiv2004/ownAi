import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PurchaseOrderForm from "./components/PurchaseOrderForm";

function App() {
  
  return (
    <>
      <div className="container  rounded-3">
        <div className="card shadow-lg my-3 ">
          <PurchaseOrderForm />
        </div>
      </div>
    </>
  );
}

export default App;
