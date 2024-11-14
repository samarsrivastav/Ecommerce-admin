export const ContactNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-300 rounded-lg p-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-500 mb-4"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v3a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 10.586V7z"
                    clipRule="evenodd"
                />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">No Contacts Found</h2>
            <p className="text-gray-500">You currently have no Complaints or Queries. Wait for new contacts to be listed here.</p>
        </div>
    )
}
