const DemoForm = () => {
    return (
      <div className="max-w-full mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Inquiry Form</h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[ 'formNo', 'fullName', 'mobileNo', 'parentsMobileNo', 'address', 'schoolName', 'referenceName', 'formFillBy', 'seatNo', 'result', 'college', 'counselorName', 'email', 'password', 'date', 'aadharNo', 'dateOfBirth' ].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize font-semibold mb-2 text-gray-700">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={field.includes('password') ? 'password' : field.includes('date') ? 'date' : 'text'}
                name={field}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
              />
            </div>
          ))}
  
          {[ { name: 'board', options: ['CBSE', 'ICSE', 'State Board', 'Other'] }, { name: 'priority_one', options: ['Option 1', 'Option 2', 'Option 3'] }, { name: 'priority_two', options: ['Option 1', 'Option 2', 'Option 3'] }, { name: 'priority_three', options: ['Option 1', 'Option 2', 'Option 3'] }, { name: 'status', options: ['Pending', 'Accepted', 'Rejected'] }, { name: 'admissionCategory', options: ['General', 'OBC', 'SC/ST', 'Other'] }, { name: 'category', options: ['A', 'B', 'C'] } ].map((select) => (
            <div key={select.name} className="flex flex-col">
              <label className="capitalize font-semibold mb-2 text-gray-700">{select.name.replace(/([A-Z])/g, ' $1')}</label>
              <select name={select.name} className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm">
                {select.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
  
          <div className="col-span-1 sm:col-span-2 flex justify-between">
            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
              Submit Inquiry
            </button>
            <button type="reset" className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition shadow-md">
              Reset
            </button>
          </div>
        </form>
      </div>
    )
  }
  
  export default DemoForm;
  