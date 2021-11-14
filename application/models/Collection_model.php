<?php

/**
 * controls database logic for collection controller
 */
class collection_model extends ci_model
{
    public function __construct()
    {
        $this->load->database();
    }

    /**
     * retrieve data for all openers
     * @return array of all pco openers, their pieces and data
     */
    public function getOpeners()
    {
        try {
            $query = $this->db->get('openers');
            return $query->result_array();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve rating data of single user,
     * @param $userId if null, return all ratings from all users
     * @return mixed
     */
    public function getRatings($userId){
        try {
            if ($userId != null && intVal($userId) >= 0) {
                $this->db->where('user_id', $userId);
            }
            $query = $this->db->get('ratings');

            return $query->result();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve only openers that have been favorited by a specified user
     * @param int $userId
     * @return array of all openers favorited by user
     */
    public function getFavorited(int $userId){
        try {
            $this->db->select('openers.pco_id, openers.pieces, openers.opener_data')
                ->from('openers')
                ->join('ratings', 'ratings.pco_id = openers.pco_id');
            $this->db->where('ratings.user_id', $userId);
            $this->db->where('ratings.favorited', true);

            $query = $this->db->get();
            return $query->result_array();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * inserts user-specified rating and favorited status of single opener
     * @param array $ratingData userId, openerId, rating, favorited
     */
    public function insertRating(array $ratingData){
        try {
            $userData = array(
                'user_id' => $ratingData["userId"],
                'pco_id' => $ratingData["openerId"],
                'rating' => $ratingData["rating"],
                'favorited' => $ratingData["favorited"],
            );

            //if opener rating already exists, update
            $this->db->where('user_id', $userData["user_id"]);
            $this->db->where('pco_id', $userData["pco_id"]);

            if ($this->db->count_all_results('ratings') > 0){
                $this->db->where('pco_id', $userData["pco_id"]);
                $this->db->update('ratings', $userData);

            } else {
                $this->db->insert('ratings', $userData);
            }

        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * delete rating given a user and the rating
     * @param array $ratingData userId and openerId
     */
    public function deleteRating(array $ratingData){
        try {
            $userData = array(
                'user_id' => $ratingData["userId"],
                'pco_id' => $ratingData["openerId"],
            );

            $this->db->delete('ratings', $userData);
        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }
}