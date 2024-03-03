import Source from '@models/Source';

export async function getAllSources(): Promise<Source[]> {
  const { invoke } = await import('@tauri-apps/api/tauri');
  return invoke<Source[]>('get_all_sources');
}

export async function addNewSource(source: Source) {
  const { invoke } = await import('@tauri-apps/api/tauri');

  return invoke('add_source', {
    newSource: source,
  });
}
