"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoSearch } from "react-icons/io5";
import { ProfileSearchCard } from "@/components/profile-search-card";
import { useLazyQuery,useMutation } from '@apollo/client';
import Loading from "@/components/skeleton";
import { GET_USER_BY_SEARCH } from "@/graphql/queries/getUserBySearch";
import { debounce } from "lodash";
import { useState,useEffect } from "react";
import { userIdAtom } from "@/atoms/userIdAtom";
import { useRecoilValue } from "recoil";
import { SEND_FRIEND_REQUEST } from "@/graphql/mutations/sendFriendRequest";

const Page = () => {
  const [getUserBySearch, { loading, error, data, refetch }] = useLazyQuery(GET_USER_BY_SEARCH);
  const [sendFriendRequest,{mutaionData,mutationLoading,mutationError}] = useMutation(SEND_FRIEND_REQUEST);
  const userId = useRecoilValue(userIdAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    if (data) {
      setSearchResults(data.getUserBySearch);
    }
  }, [data]);
  const debouncedSearch = debounce(search => {
    if (search.length >= 3) {
      getUserBySearch({ variables: { searchString: search, limit: 5,currentUserId:userId } });
    }
  }, 500);
  const handleSendFriendRequest = ({currentUserId,searchedUserId}) => {
    sendFriendRequest({
      variables:{  
        "senderId": currentUserId,
        "receiverId": searchedUserId
      },
      onCompleted:()=>refetch()
    })
  };

  const handleSearch = event => {
    const search = event.target.value;
    setSearchTerm(search);
    debouncedSearch(search);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-2 w-full sticky z-10 top-0 border-y border-gray-500/50 p-2 backdrop-blur-lg ">
        <Input 
            placeholder="Search people here..."
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="relative"
        />
        <IoSearch className="absolute right-4 top-4" />        
      </div>
      {!error && loading ? <Loading /> : <></>}
      {error && !loading ? `${error}` : <></>}
        {(searchResults && searchResults.length !== 0) ? 
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-2 gap-2">
            {searchResults.map((user,index)=>(
              <ProfileSearchCard name={user.name} email={user.email} image={user.image} searchedUserId={user._id} key={user._id} isFriend={user.isFriend} isRequestSent={user.isRequestSent} currentUserId={userId} handleSendFriendRequest={handleSendFriendRequest} hasIncomingRequest={user.hasIncomingRequest}/>
            ))}
          </div>
            : 
            <div className="flex w-full h-full justify-center items-center text-lg">
              {(searchTerm && searchResults) && searchResults?.length === 0 ? `No User Found - with term \u0022${searchTerm}\u0022` : ""}
              {searchTerm.length <= 3 && searchResults === null ? "Search People from above." : ""}
            </div>
      }
    </div>
  )
};

export default Page;
