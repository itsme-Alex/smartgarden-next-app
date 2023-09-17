import {
    useState
} from "react";
import Link
    from "next/link";

const IrrigationsHistory = () => {
    const [irrigations, setIrrigations] = useState([])
    return (
        <div>
            <h1>irrigations
                history</h1>
            <ul>
                {irrigations && irrigations.slice(0, 5).map((irrigation) => (
                    <li key={irrigation.id}>
                        {irrigation.date} : {irrigation.electrovalve.name}
                    </li>
                ))}
            </ul>
            <Link href="/history/">
                Plus...
            </Link>
        </div>
    )
}