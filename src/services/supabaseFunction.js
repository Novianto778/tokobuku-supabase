import { supabase } from "services/supabaseClient";

export const insertTable = async (table, data) => {
  try {
    const { error } = await supabase.from(table).insert([data]);

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
