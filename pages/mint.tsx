


<input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setVideos([...e.target.files]);
          }
        }}
      />