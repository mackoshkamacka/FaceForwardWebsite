import CreateNewService from "./CreateNewService";
import ArtistsServices from "./ArtistsServices"; 
import ArtistRequest from "./ArtistRequest";

export default function ArtistDashboard() {
  return (
    <div>
      <h1>Welcome Artist</h1>
      <CreateNewService />
      <ArtistsServices />
      <ArtistRequest />
    </div>
  );
}