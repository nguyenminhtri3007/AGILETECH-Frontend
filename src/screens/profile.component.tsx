import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  deletePost,
  createPost,
  updatePost,
} from "../data/services/post.service";
import { PostModel } from "../data/models/post.model";
import "./profile.component.scss";
import * as AuthService from "../data/services/auth.service";

import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

interface PostTableItem extends PostModel {
  id: number;
}

const emptyForm = { title: "", description: "", tags: "" };
type FormState = typeof emptyForm & { id?: number };

const Profile = () => {
  const [posts, setPosts] = useState<PostTableItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts(titleFilter, page);
      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts);
        setTotalPages(data.total_page || 1);
      } else {
        setPosts([]);
        setTotalPages(1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [titleFilter, page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá?")) return;
    await deletePost(id);
    fetchPosts();
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (post: PostTableItem) => {
    setForm({
      id: post.id,
      title: post.title,
      description: post.description,
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
    });
    setIsEdit(true);
    setFormError("");
    setShowForm(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setFormError("Title và Description là bắt buộc");
      return;
    }
    if (form.title.trim().length < 3) {
      setFormError("Title phải có ít nhất 3 ký tự");
      return;
    }
    if (form.description.trim().length < 10) {
      setFormError("Description phải có ít nhất 10 ký tự");
      return;
    }
    const tagsArr = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tagsArr.length > 5) {
      setFormError("Tối đa 5 tag cho mỗi post");
      return;
    }
    const tagRegex = /^[\w\- ]+$/;
    for (const tag of tagsArr) {
      if (!tagRegex.test(tag)) {
        setFormError("Tag chỉ được chứa chữ, số, dấu gạch ngang và dấu cách");
        return;
      }
    }
    const uniqueTags = Array.from(new Set(tagsArr.map((t) => t.toLowerCase())));
    if (uniqueTags.length !== tagsArr.length) {
      setFormError("Không được nhập tag trùng lặp");
      return;
    }
    try {
      if (isEdit && form.id) {
        await updatePost(form.id, new PostModel({ ...form, tags: tagsArr }));
      } else {
        await createPost(new PostModel({ ...form, tags: tagsArr }));
      }
      setShowForm(false);
      fetchPosts();
    } catch (err: any) {
      console.log(err);
      setFormError(err?.message || "Có lỗi xảy ra");
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      window.location.href = "/";
    } catch (err: any) {
      alert(err?.message || "Logout failed!");
    }
  };

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <div className="logo">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
        </div>
        <nav>
          <div className="sidebar-link active">Posts</div>
          <div className="sidebar-link" onClick={handleLogout}>
            Logout
          </div>
        </nav>
      </aside>
      <main className="main-content">
        <div className="top-bar">
          <button className="add-btn" onClick={openAddForm}>
            Add new
          </button>
          <input
            className="filter-input"
            placeholder="Title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </div>
        <table className="post-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : Array.isArray(posts) && posts.length === 0 ? (
              <tr>
                <td colSpan={5}>No posts</td>
              </tr>
            ) : (
              (Array.isArray(posts) ? posts : []).map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    {Array.isArray(post.tags)
                      ? post.tags.join(", ")
                      : post.tags}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn"
                        title="Edit"
                        onClick={() => openEditForm(post)}
                      >
                        <img
                          src={editIcon}
                          alt="Edit"
                          className="action-icon"
                        />
                      </button>
                      <button
                        className="action-btn"
                        title="Delete"
                        onClick={() => handleDelete(post.id!)}
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="action-icon"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="pagination-bar">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        {showForm && (
          <div className="modal-backdrop">
            <div className="modal-form">
              <h3>{isEdit ? "Edit Post" : "Add New Post"}</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tags (phân tách bằng dấu phẩy)</label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleFormChange}
                  />
                </div>
                {formError && <div className="form-error">{formError}</div>}
                <div className="form-actions">
                  <button type="submit" className="add-btn">
                    {isEdit ? "Save" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="add-btn"
                    style={{ background: "#ccc", color: "#333" }}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
