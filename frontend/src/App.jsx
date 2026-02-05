import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CampaignList from "./pages/CampaignList";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetail from "./pages/CampaignDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/campaigns" />} />
      <Route path="/campaigns" element={<CampaignList />} />
      <Route path="/campaigns/create" element={<CreateCampaign />} />
      <Route path="/campaigns/:id" element={<CampaignDetail />} />
    </Routes>
  </Router>
);

export default App;
