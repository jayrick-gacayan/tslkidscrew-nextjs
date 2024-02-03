import InfoContainer from "@/app/admin/(dashboard)/_components/info-container";

export default function ChildrenInformation() {
  let children = [
    { id: 1, firstName: 'Elle', lastName: 'Doe', age: 18, dob: '2005-11-11', school: 'USC' },
    { id: 2, firstName: 'Ella', lastName: 'Doe', age: 18, dob: '2005-11-11', school: 'USJR' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-tertiary">CHILD/REN INFOMATION</p>
      {
        children.map((value: any, index: number) => {
          return (
            <div key={`parent-program-children-${value.firstName}`}
              className="rounded p-8 bg-secondary space-y-4">
              {children.length > 1 && (<div>CHILDREN # {index + 1}</div>)}
              <div className="columns-1 lg:columns-2">
                <InfoContainer label='FIRST NAME' data={value.firstName} />
                <InfoContainer label='LAST NAME' data={value.lastName} />
                <InfoContainer label='AGE' data={18} />
                <InfoContainer label='DATE OF BIRTH'
                  data={
                    <div className="space-x-2">
                      {new Date('02/28/18 01:00 AM').toLocaleDateString('en-US', { month: '2-digit', day: "2-digit", year: "numeric" })} &nbsp;
                      {new Date('02/28/18 01:00 AM').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                  } />
                <InfoContainer label='SCHOOL ATTENDING' data={value.school} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}