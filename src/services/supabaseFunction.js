import { supabase } from "services/supabaseClient";

export const insertTable = async (table, data) => {
  const payload = data.length ? data : [data];
  try {
    const { error } = await supabase.from(table).insert(payload);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
};

export const uploadImage = async (bucket, path, image) => {
  try {
    const { error } = await supabase.storage.from(bucket).upload(path, image);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
};

export const downloadImage = async (bucket, path, cb) => {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);

    if (error) throw error;
    const url = URL.createObjectURL(data);
    cb(url);
  } catch (error) {
    alert(error.message);
  }
};
export const deleteImage = async (bucket, img) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([img]);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
};

export const updateBook = async (data, id) => {
  try {
    const { error } = await supabase
      .from("book")
      .update(data)
      .eq('id', id);
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
};
