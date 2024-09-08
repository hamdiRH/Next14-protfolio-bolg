import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { BsPostcard, BsTag } from "react-icons/bs";
import axios from "axios";
import Modal from "@/components/Modal";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Dataloading from "@/components/DataLoading";
import Pagination from "rc-pagination";
import ReactIcon from "@/components/ReactIcon";

export default function tags() {
  const [selectedTag, setSelectedTag] = useState();

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alldata, setAlldata] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tagTitle, setTagTitle] = useState("");
  const [tagIcon, setTagIcon] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const handleSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  const handleAddTag = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/api/tagsapi", {
        name: tagTitle,
        slug: handleSlug(tagTitle),
        iconName: tagIcon,
      });
      setTagTitle("");
      setTagIcon("");
      closeModal();
      setRefresh((prev) => !prev);
      setLoading(true);
    } catch (error) {}
  };
  const deleteTag = async () => {
    try {
      await axios.delete("/api/tagsapi?id=" + selectedTag?._id);
      closeDeleteModal();
      setRefresh((prev) => !prev);
      setLoading(true);
    } catch (error) {}
  };
  const handleUpdateTag = async (ev) => {
    ev.preventDefault();
    try {
      await axios.put("/api/tagsapi?id=" + selectedTag?._id, {
        _id: selectedTag?._id,
        slug: handleSlug(selectedTag?.name),
        name: selectedTag?.name,
        iconName: selectedTag?.iconName,
      });
      closeUpdateModal();
      setRefresh((prev) => !prev);
      setLoading(true);
    } catch (error) {}
  };
  const handlePageChange = (current, pageSize) => {
    setPage(current);
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/tagsapi?page=${page}&limit=${limit}`
        );
        const { totalPages, totalItems, items } = response.data;
        setTotal(totalPages);
        setAlldata(items || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, [page, limit, refresh]);

  return (
    <ProtectedRoute>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} hideCloseBtn>
        <div className="deletecard" style={{ width: "auto" }}>
          <div style={{ width: "80px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 456 511.82"
            >
              <path
                fill="#FD3B3B"
                d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z"
              />
            </svg>
          </div>
          <p className="cookieHeading">Are you sure ?</p>
          <p className="cookieDescription">
            If you delete this tag all blogs under this tag will be updated
          </p>
          <div className="buttonContainer">
            <button className="acceptButton" onClick={deleteTag}>
              Delete
            </button>
            <button className="declineButton" onClick={closeDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isModalOpen} onClose={closeModal} hideContainer>
        <form className="addWebsiteform" onSubmit={handleAddTag}>
          <h2 className="text-center">Add tag</h2>
          <div
            className="w-100 flex flex-col flex-left mb-2"
            data-aos="fade-up"
          >
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="slug"
              placeholder="Enter slug url"
              value={tagTitle}
              onChange={(e) => setTagTitle(e.target.value)}
            />
          </div>
          <div
            className="w-100 flex flex-col flex-left mb-2"
            data-aos="fade-up"
          >
            <label htmlFor="Title">Icon</label>
            <input
              type="text"
              id="icon"
              placeholder="Enter icon name"
              value={tagIcon}
              onChange={(e) => setTagIcon(e.target.value)}
            />
          </div>
          {/* Save button */}
          <div className="w-100 mb-2" data-aos="fade-up">
            <button type="submit" className="w-100 addwebbtn flex-center">
              SAVE TAG
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        hideContainer
      >
        <form className="addWebsiteform" onSubmit={handleUpdateTag}>
          <h2 className="text-center">Update tag</h2>
          <div
            className="w-100 flex flex-col flex-left mb-2"
            data-aos="fade-up"
          >
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="slug"
              placeholder="Enter slug url"
              value={selectedTag?.name}
              onChange={(e) =>
                setSelectedTag((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div
            className="w-100 flex flex-col flex-left mb-2"
            data-aos="fade-up"
          >
            <label htmlFor="Title">Icon</label>
            <input
              type="text"
              id="icon"
              placeholder="Enter icon name"
              value={selectedTag?.iconName}
              onChange={(e) =>
                setSelectedTag((prev) => ({
                  ...prev,
                  iconName: e.target.value,
                }))
              }
            />
          </div>
          {/* Save button */}
          <div className="w-100 mb-2" data-aos="fade-up">
            <button type="submit" className="w-100 addwebbtn flex-center">
              UPDATE TAG
            </button>
          </div>
        </form>
      </Modal>
      <div className="tags">
        <div className="titledashboard flex flex-sb">
          <div className="" data-aos="fade-right">
            <h2>All Tags</h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <BsTag /> <span>/</span> <span>Tags</span>
          </div>
        </div>
        <div className="blogstable" data-aos="fade-up">
          <div className="flex flex-right">
            <buuton className="addtag mb-1" onClick={openModal}>
              + Add Tag
            </buuton>
          </div>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Icon</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <Dataloading />
                  </td>
                </tr>
              ) : alldata.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Tags
                  </td>
                </tr>
              ) : (
                alldata.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.slug}</td>
                      <td className="flex gap-1 ">
                        <ReactIcon
                          icon={item.iconName}
                          size={20}
                          color="black"
                        />
                        {item.iconName}
                      </td>
                      <td>
                        <div className="flex gap-2 flex-center">
                          <button
                            title="edit"
                            onClick={() => {
                              setSelectedTag(item);
                              openUpdateModal();
                            }}
                          >
                            <FaEdit />
                          </button>

                          <button
                            title="delete"
                            onClick={() => {
                              setSelectedTag(item);
                              openDeleteModal();
                            }}
                          >
                            <RiDeleteBin6Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            total={total}
            pageSize={limit}
            currentPage={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
