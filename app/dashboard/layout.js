import Sidebar from "@/components/dashboard/sidebar";
export default function DashboardLayout({ children }) {
    return (
        <div style={{display: "flex", flexDirection:"row"}}>
            <Sidebar/>
            {children}
        </div>
    );
}