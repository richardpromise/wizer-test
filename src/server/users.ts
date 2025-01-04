import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
  } from "@tanstack/react-query";
  import { useState } from "react";
  import { IUsers } from "../interface/user"; 
  import { useParams } from "react-router-dom";
  
  export interface IUserFormData {
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  export function useUsers() {
    const params = useParams();
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [formData, setFormData] = useState<IUserFormData>({
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    });
  
    const queryClient = useQueryClient();
  
    const fetchUsers = async (page: number): Promise<IUsers[]> => {
      const res = await fetch(
        `${baseUrl}/users?_page=${page}&_limit=${itemsPerPage}`
      );
      const totalCount = res.headers.get("X-Total-Count");
      if (totalCount) {
        setTotalPages(Math.ceil(parseInt(totalCount, 10) / itemsPerPage));
      }
      return res.json();
    };
  
    const createUser = async (newUser: IUserFormData) => {
      const res = await fetch(`${baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return res.json();
    };
  
    const getUserById = async (id: number): Promise<IUsers> => {
      const res = await fetch(`${baseUrl}/users/${id}`);
      return res.json();
    };
  
    const updateUser = async (updatedUser: IUsers) => {
      const res = await fetch(`${baseUrl}/users/${updatedUser.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return res.json();
    };
  
    const isFormComplete = () => {
      return (
        formData.name &&
        formData.username &&
        formData.email &&
        formData.address.street &&
        formData.address.suite &&
        formData.address.city &&
        formData.address.zipcode &&
        formData.address.geo.lat &&
        formData.address.geo.lng &&
        formData.phone &&
        formData.website &&
        formData.company.name &&
        formData.company.catchPhrase &&
        formData.company.bs
      );
    };
  
    const {
      data = [],
      isLoading,
      isFetching,
    } = useQuery<IUsers[]>({
      queryKey: ["users", currentPage, itemsPerPage],
      queryFn: () => fetchUsers(currentPage),
      staleTime: 1000,
      placeholderData: [],
    });
  
    const { data: userDetails, isLoading: isUserLoading } =
      useSuspenseQuery<IUsers>({
        queryKey: ["user", params.id],
        queryFn: () => getUserById(Number(params.id)),
      });
  
    const { mutate: addUser, isPending: addingUser } = useMutation<IUsers>({
      mutationFn: async () => {
        return await createUser(formData);
      },
      onSuccess: (newUser) => {
        queryClient.setQueryData<IUsers[]>(
          ["users", currentPage, itemsPerPage],
          (oldUsers) => [newUser, ...(oldUsers || [])]
        );
  
        setFormData({
          name: "",
          username: "",
          email: "",
          address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
              lat: "",
              lng: "",
            },
          },
          phone: "",
          website: "",
          company: {
            name: "",
            catchPhrase: "",
            bs: "",
          },
        });
      },
    });
  
    const {
      mutate: updateUserById,
      isPending: updatingUser,
      data: updatedUser,
    } = useMutation({
      mutationFn: async (updatedUser: IUsers) => {
        return await updateUser(updatedUser);
      },
      onSuccess: (updatedUser: IUsers) => {
        return updatedUser;
      },
    });
  
    const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
  
    const handlePrev = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
  
    const handleUpdateUser = (updatedUser: IUsers) => {
      updateUserById(updatedUser);
    };
  
    return {
      data,
      isLoading,
      isFetching,
      currentPage,
      totalPages,
      itemsPerPage,
      formData,
      addingUser,
      userDetails,
      isUserLoading,
      updatingUser,
      updatedUser,
      handleUpdateUser,
      setFormData,
      addUser,
      handleNext,
      handlePrev,
      setCurrentPage,
      setItemsPerPage,
      isFormComplete,
    };
  }
  