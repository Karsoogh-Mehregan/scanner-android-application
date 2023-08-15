import QRCodeReader from "../components/QRCodeReader";

export default function Footstep({ route }) {
    return (
        <QRCodeReader action={route.params.query} selectedItemData={route.params.selectedItemData} />
    );
}
