import CreateNewService from "../components/artist/CreateNewService";
import ArtistsServices from "../components/artist/ArtistsServices";
import ArtistRequest from "../components/artist/ArtistRequest";

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