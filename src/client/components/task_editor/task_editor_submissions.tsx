import { useCallback, useState } from "react";
import { SubmissionsTable } from "client/components/submissions_table";
import commonStyles from "client/components/common_editor/common_editor.module.css";
import { SubmissionsCache } from "client/submissions";

type TaskEditorSubmissionsProps = {
  taskId: string;
  cache: SubmissionsCache;
};

export const TaskEditorSubmissions = ({ taskId, cache }: TaskEditorSubmissionsProps) => {
  const [loaded, setLoaded] = useState(cache.loaded);

  const loadSubmissions = useCallback(async () => {
    if (cache.loaded) {
      return cache.submissions;
    }
    const result = await cache.loadTaskSubmissions(taskId);
    setLoaded(cache.loaded);
    return result;
  }, [cache, taskId]);

  return (
    <div className={commonStyles.content}>
      <div className="max-w-[64rem] mx-auto mt-4">
        <SubmissionsTable
          loaded={loaded}
          submissions={cache.submissions}
          loadSubmissions={loadSubmissions}
          showUser={true}
        />
      </div>
    </div>
  );
};
