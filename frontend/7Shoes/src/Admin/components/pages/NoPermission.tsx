export default function NoPermission() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
                <div className="w-16 h-16 text-red-500 mx-auto" />
                <h1 className="text-2xl font-semibold text-gray-800 mt-4">Truy cập bị từ chối</h1>
                <p className="text-gray-600 mt-2">Bạn không có quyền truy cập chức năng này.</p>
            </div>
        </div>
    );
}
