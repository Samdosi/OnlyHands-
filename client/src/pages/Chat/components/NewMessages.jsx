import React from 'react';
import Card from './Card';

const NewMessages = () => {

    const cards = [
        {
            picture: 'https://scontent-atl3-2.xx.fbcdn.net/v/t1.6435-9/80192852_2792338754158050_862576909328842752_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xHnC3p2bApkAX_oVn2H&_nc_ht=scontent-atl3-2.xx&oh=00_AT9g8gsztIqIlQsmK1w1zZAf_0zQlKDOUAszw2_RaSCOGQ&oe=63783BCD',
            name: 'Brandon',
            online: true
        },
        {
            picture: 'https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'Josh',
            online: true
        },
        {
            picture: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'Box Master',
            online: false
        },
        {
            picture: 'https://scontent-atl3-2.xx.fbcdn.net/v/t1.6435-9/80192852_2792338754158050_862576909328842752_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xHnC3p2bApkAX_oVn2H&_nc_ht=scontent-atl3-2.xx&oh=00_AT9g8gsztIqIlQsmK1w1zZAf_0zQlKDOUAszw2_RaSCOGQ&oe=63783BCD',
            name: 'Brandon',
            online: false
        },
        {
            picture: 'https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            name: 'Josh',
            online: true
        },
        {
            picture: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Boxing_Tournament_in_Aid_of_King_George%27s_Fund_For_Sailors_at_the_Royal_Naval_Air_Station%2C_Henstridge%2C_Somerset%2C_July_1945_A29806.jpg',
            name: 'Box Master',
            online: true
        },
    ];

  return (
    <div className=' w-full h-[25%] min-h-[170px] relative pt-5'>

            <h1 className='text-lg md:text-xl'>New Messages</h1>

            <div className='flex w-full h-fit text-center overflow-x-auto pt-3 overflow-hidden hide-scrollbar'>

                {
                    cards.map(c => {
                        return(
                            <Card 
                                picture={c.picture}
                                name={c.name}
                                online={c.online}
                            />
                        );
                    })
                }

            </div>
        </div>
  )
}

export default NewMessages;