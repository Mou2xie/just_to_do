
const Heading = ({ data }) => {

    return (
        <div className='flex items-center'>
            {
                data.length > 0 ? (
                    <>
                        <div className=' text-xl font-semibold text-white bg-[#AFB8BB] px-2 rounded-full leading-6 text-base'>{data.length}</div>
                        <div className=' ml-2 text-xl font-semibold text-[#AFB8BB] select-none'>REMAINS</div>
                    </>
                ) : (
                    <div className=' text-xl font-semibold text-[#AFB8BB] select-none'>CLEARED</div>
                )

            }
        </div>
    )
}

export { Heading }