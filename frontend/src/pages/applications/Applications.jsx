import { useState, useEffect } from "react";
import api from "../../api/axios";
import AppLayout from "../../layouts/AppLayout";
import ApplicationsHeader from "../../components/Applications/ApplicationsHeader";
import ApplicationsTable from "../../components/Applications/ApplicationsTable";
import ApplicationRow from "../../components/Applications/ApplicationRow";
import AddApplicationModal from "../../components/Applications/AddApplicationModal";
import DeleteConfirmationModal from "../../components/Applications/DeleteConfirmModal";
import ViewApplicationModal from "../../components/Applications/ViewApplicationModal";
import Pagination from "../../components/Pagination";
import SortControls from "../../components/Applications/SortControls";

function Applications(){
    const [applications,setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status,setStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedApplication,setSelectedApplication] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    function handleAddApplication() {
    setSelectedApplication(null);
    setShowModal(true);
    }
    function handleEditApplication(application) {
        setSelectedApplication(application);
        setShowModal(true);
    }
    function handleDeleteApplication(application) {
        setSelectedApplication(application);
        setShowDeleteModal(true);
    }
    function handleViewApplication(application) {
        setSelectedApplication(application);
        setShowViewModal(true);
}
    async function fetchApplications() {
        const params = {};
        if(debouncedSearch){
            params.search = debouncedSearch;
        }
        if(status){
            params.status = status;
        }
        if(sortBy){
            params.sort_by = sortBy;
            params.sort_order = sortOrder;
        }

        params.page = page,
        params.limit = 10;
        const response = await api.get("/applications",{
            params,
    });
        setApplications(response.data.items);
        setTotalPages(response.data.total_pages)
    }

    useEffect(() => {
    fetchApplications();
    
}, [debouncedSearch,status,page,sortBy, sortOrder]);

useEffect(() => {
    setPage(1);
}, [debouncedSearch, status,sortBy, sortOrder]);

    useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 500);

    return () => {
        clearTimeout(timer);
    };
}, [search]);

    return (
        <AppLayout>

    <ApplicationsHeader
        search = {search}
        setSearch = {setSearch}
        status = {status}
        setStatus = {setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleAddApplication = {handleAddApplication}/>

    {showModal && (
    <AddApplicationModal 
    setShowModal={setShowModal}
    onSuccess={fetchApplications}
    application={selectedApplication}/>
)}
    
    {showDeleteModal && (
    <DeleteConfirmationModal
        application={selectedApplication}
        setShowDeleteModal={setShowDeleteModal}
        onSuccess={fetchApplications}
        />
    )}

    {showViewModal && (
    <ViewApplicationModal
        application={selectedApplication}
        setShowViewModal={setShowViewModal}
        refreshApplications={fetchApplications}
    />
)}

        <ApplicationsTable applications={applications} 
        handleEditApplication={handleEditApplication}
        handleDeleteApplication={handleDeleteApplication}
        handleViewApplication={handleViewApplication}/>
        
        <Pagination currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
            />

</AppLayout>
    );
}
export default Applications;